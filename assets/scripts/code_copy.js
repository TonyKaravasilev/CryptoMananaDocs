const codeBlocks = document.querySelectorAll('.code-block-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.code-copy-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
    const code = codeBlocks[index].innerText;

    copyCodeButton.addEventListener('click', () => {
        window.navigator.clipboard.writeText(code);
        copyCodeButton.classList.add('copied');

        setTimeout(() => {
            copyCodeButton.classList.remove('copied');
        }, 2000);
    });
});
