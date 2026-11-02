// Hidden terminal. Opened with the backtick key or the footer prompt button.
// Everything it prints comes from the same data as the pages.
type TerminalData = { commands: Record<string, string[]> };

const dialog = document.querySelector<HTMLDialogElement>('[data-terminal]');

if (dialog) {
  const log = dialog.querySelector<HTMLElement>('[data-terminal-log]')!;
  const form = dialog.querySelector('form')!;
  const input = dialog.querySelector('input')!;
  const data = JSON.parse(
    document.querySelector('[data-terminal-facts]')?.textContent ?? '{"commands":{}}',
  ) as TerminalData;

  const print = (text: string, className?: string) => {
    const line = document.createElement('p');
    line.textContent = text;
    if (className) line.className = className;
    log.append(line);
    log.scrollTop = log.scrollHeight;
  };

  const open = () => {
    if (dialog.open) return;
    if (!log.childElementCount) print('Type help to see the commands. Press Esc to close.');
    dialog.showModal();
    input.focus();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const command = input.value.trim().toLowerCase();
    input.value = '';
    if (!command) return;
    print(`$ ${command}`, 'is-command');
    if (command === 'clear') log.replaceChildren();
    else if (command === 'exit') dialog.close();
    else if (command === 'help') {
      print([...Object.keys(data.commands), 'clear', 'exit'].join('  '));
    } else if (data.commands[command]) data.commands[command].forEach((line) => print(line));
    else print(`Command not found: ${command}. Type help to see the commands.`);
  });

  dialog.querySelector('[data-terminal-close]')?.addEventListener('click', () => dialog.close());
  document.querySelector('[data-terminal-open]')?.addEventListener('click', open);

  addEventListener('keydown', (event) => {
    if (event.key !== '`' || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    event.preventDefault();
    open();
  });
}
