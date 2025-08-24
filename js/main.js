// alphabets
    const Alphabet = {
        BINARY:        '01',
        OCTAL:         '01234567',
        DECIMAL:       '0123456789',
        HEX:           '0123456789abcdef',
        ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
        ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ALPHA_NUM:     '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        EMOJI:         '🙂🙃😊😇😉😍😘😎😭😡'
    };

      // conversion
    function convert(input, sourceAlphabet, targetAlphabet) {
      if (sourceAlphabet.length === 0 || targetAlphabet.length === 0) {
        throw new Error('Alphabet cannot be empty');
      }
      // check unique
      if ((new Set([...sourceAlphabet])).size !== [...sourceAlphabet].length) {
        throw new Error('Original alphabet has repeating symbols');
      }
      if ((new Set([...targetAlphabet])).size !== [...targetAlphabet].length) {
        throw new Error('Target alphabet has repeating symbols');
      }

      // 0 => first symbol of any targetAlphabet
      if (input.length === 0) return '';
      // all symbols input need to be in sourceAlphabet
      for (const ch of [...input]) {
        if (!sourceAlphabet.includes(ch)) {
          throw new Error(`No symbol "${ch}" in original alphabet`);
        }
      }

      const fromBase = BigInt([...sourceAlphabet].length);
      const toBase   = BigInt([...targetAlphabet].length);

      let decimal = 0n;
      for (const ch of [...input]) {
        const digit = BigInt([...sourceAlphabet].indexOf(ch));
        decimal = decimal * fromBase + digit;
      }

      if (decimal === 0n) return [...targetAlphabet][0];

      let result = '';
      const tarr = [...targetAlphabet];
      while (decimal > 0n) {
        const rem = Number(decimal % toBase);
        result = tarr[rem] + result;                
        decimal = decimal / toBase;                 
      }
      return result;
    }

    // UI
    const $ = sel => document.querySelector(sel);
    const inputEl  = $('#inputValue');
    const srcEl    = $('#sourceAlphabet');
    const dstEl    = $('#targetAlphabet');
    const outEl    = $('#output');
    const statusEl = $('#status');

    // Presets
    const srcPresets = $('#srcPresets');
    const dstPresets = $('#dstPresets');
    const presetButtons = [
      { label: 'Binary',   value: Alphabet.BINARY },
      { label: 'Octal',    value: Alphabet.OCTAL },
      { label: 'Decimal',  value: Alphabet.DECIMAL },
      { label: 'Hex',      value: Alphabet.HEX },
      { label: 'alpha',    value: Alphabet.ALPHA_LOWER },
      { label: 'ALPHA',    value: Alphabet.ALPHA_UPPER },
      { label: 'Alpha+Upper', value: Alphabet.ALPHA },
      { label: 'Alphanumeric', value: Alphabet.ALPHA_NUM },
      { label: 'Emoji (10)', value: Alphabet.EMOJI },
    ];

    function renderPresetRow(container, onPick) {
      presetButtons.forEach(p => {
        const b = document.createElement('button');
        b.className = 'btn';
        b.textContent = p.label;
        b.addEventListener('click', () => onPick(p.value));
        container.appendChild(b);
      });
    }
    renderPresetRow(srcPresets, v => srcEl.value = v);
    renderPresetRow(dstPresets, v => dstEl.value = v);

    // Demo
    inputEl.value = 'hello';
    srcEl.value   = Alphabet.ALPHA_LOWER;
    dstEl.value   = Alphabet.HEX;

    // Actions
    const convertBtn = $('#convertBtn');
    const swapBtn    = $('#swapBtn');
    const copyBtn    = $('#copyBtn');

    function runConvert() {
      outEl.classList.remove('error');
      statusEl.textContent = '—';
      try {
        const val = convert(inputEl.value, srcEl.value, dstEl.value);
        outEl.textContent = val;
        statusEl.textContent = 'Cool!';
      } catch (e) {
        outEl.textContent = e.message || String(e);
        outEl.classList.add('error');
        statusEl.textContent = 'Error :(';
      }
    }

    convertBtn.addEventListener('click', runConvert);
    swapBtn.addEventListener('click', () => {
      const a = srcEl.value; srcEl.value = dstEl.value; dstEl.value = a;
      runConvert();
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(outEl.textContent || '');
        statusEl.textContent = 'Copied';
      } catch {
        statusEl.textContent = 'Copy failed';
      }
    });

    // press Enter
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        runConvert();
      }
    });

    // first render
    runConvert();