'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const data = {
        BINARY: '01',
        OCTAL: '01234567',
        DECIMAL: '0123456789',
        HEX: '0123456789abcdef',
        ALPHA_LOWER: 'abcdefghijklmnopqrstuvwxyz',
        ALPHA_UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
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
        const fromBase = BigInt([...initAlphabet]),
              toBase = BigInt([...targetAlphabet]);

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
    }

    // UI
    const $ = selector => document.querySelector(selector),
          inputEl = $('#inputValue'),
          srcEl = $('#initAlphabet'),
          destinationEl = $('#targetAlphabet'),
          outputEl = $('#output'),
          statusEl = $('#status');

    const srcPresets = $('#srcPresets'),
      destPresets = $('#destinationPresets'),
      presetButtons = [
                        { 
                            label: 'Binary',
                            value: Alphabet.BINARY
                        },
                        { 
                            label: 'Octal',
                            value: Alphabet.OCTAL
                        },
                        { 
                            label: 'Decimal',
                            value: Alphabet.DECIMAL
                        },
                        {
                            label: 'Hex',
                            value: Alphabet.HEX 
                        },
                        {
                            label: 'alpha',
                            value: Alphabet.ALPHA_LOWER
                        },
                        { 
                            label: 'ALPHA',
                            value: Alphabet.ALPHA_UPPER
                        },
                        {
                            label: 'Alpha+Upper',
                            value: Alphabet.ALPHA
                        },
                        {
                            label: 'Alphanumeric',
                            value: Alphabet.ALPHA_NUM
                        },
                        {
                            label: 'Emoji (10)',
                            value: Alphabet.EMOJI
                        },
                    ];

    function renderPresetRow(container, onPick) {
        presetButtons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = button.label;
            btn.addEventListener('click', () => onPick(button.value));
            container.appendChild(button);
        })
    };

    renderPresetRow(srcPresets, value => srcEl.value = value);
    renderPresetRow(destPresets, value => destinationEl.value = value);

    // Preview
    inputEl.value = 'Hello';
    srcEl.value = data.ALPHA_LOWER;
    destinationEl.value = data.HEX;

    inputEl.addEventListener('keydown', (e) => {
        if (inputEl.value === '' && e.code === 'Backspace') {
            inputEl.classList.add('error-placeholder');
            inputEl.placeholder = 'PLEASE FILL THIS FIELD!';
        } else {
            inputEl.placeholder = 'e.g. hello or 101010 or 😍😊';
            inputEl.classList.remove('error-placeholder');
        }
    });

    // Activity
    const convertBtn = $('#convertBtn'),
          swapBtn = $('#swapBtn'),
          copyBtn = $('#copyBtn');

})