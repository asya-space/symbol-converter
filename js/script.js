'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const data = {
        BINARY: '01',
        OCTAL: '01234567',
        DECIMAL: '0123456789',
        HEX: '0123456789abcdef',
        ALPHA: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ALPHA_NUM: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        EMOJI: '🙂🙃😊😇😉😍😘😎😭😡'
    };

    function convert(input, initAlphabet, targetAlphabet) {
        if (initAlphabet.length === 0 || targetAlphabet.length === 0) {
            throw new Error('Choose alphabet from the list, please');
        }

        // new Set([...dataAlphabet]) was sent from target alphabet (convert button) and 
        // looks like this
        /* Set(10) {'🙂', '🙃', '😊', '😇', '😉', …}
        [[Entries]]
        0: "🙂"
        1: "🙃"
        2: "😊"
        3: "😇"
        4: "😉"
        5: "😍"
        6: "😘"
        7: "😎"
        8: "😭"
        9: "😡"
        size: 10 // <=
        */ 

        // new Set checks unique of symbols

        if ((new Set([...initAlphabet])).size !== [...initAlphabet].length) {
            throw new Error('Initial alphabet cannot have repeating symbols');
        }

        if ((new Set([...targetAlphabet])).size !== [...targetAlphabet].length) {
            throw new Error('Target alphabet has repeating symbols');
        }

        if (input.length === 0) return '';

        // transform length of alphabet into BigInt type for correct work of convertation
        const fromBase = BigInt([...initAlphabet].length),
              toBase = BigInt([...targetAlphabet].length);

        let decimal = 0n;
        const inputArray = [...input];
        inputArray.forEach(char => {
            // check that all symbols are correct according to choosing alphabet system
            if (!initAlphabet.includes(char)) {
                throw new Error(`No symbol ${char} in original alphabet`);
            };
            // transform input string to one big decimal number
            const digit = BigInt([...initAlphabet].indexOf(char));
            decimal = decimal * fromBase + digit;
        });

        if (decimal === 0n) return [...targetAlphabet][0];

        // transform my big number (look above) into string
        let result = '';
        const targetArray = [...targetAlphabet];
        while (decimal > 0n) {
            const remOfNumber = Number(decimal % toBase);
            result = targetArray[remOfNumber] + result;
            decimal = decimal / toBase;
        };

        return result;
    };

    // UI
    const $ = selector => document.querySelector(selector),
          srcEl = $('#initAlphabet'), // input string
          destinationEl = $('#targetAlphabet'),
          outputEl = $('#output'),
          statusEl = $('#status');

    const srcPresets = $('#srcPresets'),
      destPresets = $('#destinationPresets'),
      presetButtons = [
                        { 
                            label: 'Binary',
                            value: data.BINARY
                        },
                        { 
                            label: 'Octal',
                            value: data.OCTAL
                        },
                        { 
                            label: 'Decimal',
                            value: data.DECIMAL
                        },
                        {
                            label: 'Hex',
                            value: data.HEX 
                        },
                        {
                            label: 'Alphabet (any letters, upper and lower)',
                            value: data.ALPHA
                        },
                        {
                            label: 'Alphanumeric',
                            value: data.ALPHA_NUM
                        },
                        {
                            label: 'Emoji (10)',
                            value: data.EMOJI
                        },
                    ];
    
    function highlightButton(container, alphabetValue) {
        const buttons = container.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === alphabetValue)
        })
    }

    function renderPresetRow(container, onPick) {
        presetButtons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = button.label;
            btn.dataset.value = button.value;

            btn.addEventListener('click', () => {
                onPick(button.value);
                highlightButton(container, button.value);
            });
            container.appendChild(btn);
        })
    };

    renderPresetRow(srcPresets, value => {
        srcEl.value = value;
        startConvert();
    });

    renderPresetRow(destPresets, value => {
        destinationEl.value = value;
        startConvert();
    });

    // Preview
    srcEl.value = 'Hello';
    destinationEl.value = data.HEX;
    highlightButton(srcPresets, srcEl.value);
    highlightButton(destPresets, destinationEl.value);

    // Activity
    // $ instead of document.querySelector, was initiated above
    const convertBtn = $('#convertBtn'),
          swapBtn = $('#swapBtn'),
          copyBtn = $('#copyBtn');

    function detectAlphabet(text) {
        const chars = [...text];
        if (chars.length === 0) return null;

        const matchPreset = presetButtons.find(preset => {
            const alphabetChars = [...preset.value];
            return chars.every(char => alphabetChars.includes(char));
        });

        return matchPreset ? matchPreset.value : null;
    }

    function startConvert() {
        outputEl.classList.remove('error');
        statusEl.textContent = '_';
        try {
            const enterValue = convert(srcEl.value, destinationEl.value);
            outputEl.textContent = enterValue;
            statusEl.textContent = 'Cool!';
        } catch(e) {
            outputEl.textContent = e.message || String(e);
            outputEl.classList.add('error');
            statusEl.textContent = 'Error :(';
        }
    };

    convertBtn.addEventListener('click', startConvert);

    srcEl.addEventListener('input', () => {
        const detectedValue = detectAlphabet(srcEl.value);

        if (detectedValue) {
            srcEl.value = detectedValue;
            highlightButton(srcPresets, detectedValue);
        } else {
            highlightButton(srcPresets, '');
        }
        startConvert();
    })

    swapBtn.addEventListener('click', () => {
        const acc = srcEl.value; // safe current value
        srcEl.value = destinationEl.value; // where to provide value
        destinationEl.value = acc; // write acc into second field (destination)    
        
        highlightButton(srcPresets, srcEl.value);
        highlightButton(destPresets, destinationEl.value);

        startConvert();
    });

    copyBtn.addEventListener('click', async () => {
        try {
            // browser API
            await navigator.clipboard.writeText(outputEl.textContent || '');
            statusEl.textContent = 'Copied';
        } catch {
            statusEl.textContent = 'Copy failed';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !e.shiftKey) {
            startConvert();
        }

        if (srcEl.value === '' && e.code === 'Backspace') {
            srcEl.classList.add('error-placeholder');
            srcEl.placeholder = 'PLEASE FILL THIS FIELD!';
        } else {
            srcEl.placeholder = 'e.g. hello or 101010 or 😍😊';
            srcEl.classList.remove('error-placeholder');
        }
    });

    startConvert();
})