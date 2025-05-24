const terminal = document.getElementById("terminal");

const commands = [
  `cowsay -r "Welcome to Lowit's site!"`,
  `echo "Hello, I'm Evgeniy!"`,
  `ls -l contacts`,
];

let outputLines = [];
let currentCommandIndex = 0;
let currentCharIndex = 0;
let typingFinished = false;

function getCowsayOutput(message) {
  const cows = [
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \         __------~~-,
    \      ,'            ,
          /               \
         /                :
        |                  '
        |                  |
        |                  |
         |   _--           |
         _| =-.     .-.   ||
         o|/o/       _.   |
         /  ~          \ |
       (____@)  ___~    |
          |_===~~~.    |
       _______.--~     |
       \________       |
                \      |
              __/-___-- -__
             /            _ \
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \  \
        \ /\
        ( )
      .( o ).
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \
      _____   _________
     /     \_/         |
    |                 ||
    |                 ||
   |    ###\  /###   | |
   |     0  \/  0    | |
  /|                 | |
 / |        <        |\ \
| /|                 | | |
| |     \_______/   |  | |
| |                 | / /
/||                 /|||
   ----------------|
        | |    | |
        ***    ***
       /___\  /___\
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
     \
      \
        ,__, |    |
        (oo)\|    |___
        (__)\|    |   )\_
             |    |_w |  \
             |    |  ||   *

             Cower....
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
 \     /\  ___  /\
  \   // \/   \/ \\
     ((    O O    ))
      \\ /     \ //
       \/  | |  \/
        |  | |  |
        |  | |  |
        |   o   |
        | |   | |
        |m|   |m|
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \  \
        \ /\
        ( )
      .( o ).
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \              ....
           ........    .
          .            .
         .             .
.........              .......
..............................

Elephant inside ASCII snake
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
  \
   \
       (\/)
      (_o |
       /  |
       \  \______
        \        )o
         /|----- |
         \|     /|
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
       \    ____
        \  /    \
          | ^__^ |
          | (oo) |______
          | (__) |      )\/\
           \____/|----w |
                ||     ||

	        Moofasa
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
  \
   \   \_\_    _/_/
    \      \__/
           (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \
    ____
   /# /_\_
  |  |/o\o\
  |  \\_/_/
 / |_   |
|  ||\_ ~|
|  ||| \/
|  |||_
 \//  |
  ||  |
  ||_  \
  \_|  o|
  /\___/
 /  ||||__
    (___)_)
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
        \  ^___^
         \ (ooo)\_______
           (___)\       )\/\
                ||----w |
                ||     ||
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/'\
    \___)=(___/
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
  \
   \    (__)
        o o\
       ('') \---------
          \           \
           |          |\
           ||---(  )_|| *
           ||    UU  ||
           ==        ==
`,
    String.raw`
 __________________________
< ${message} >
 --------------------------
        \    ,-^-.
         \   !oYo!
          \ /./=\.\______
               ##        )\/\
                ||-----w||
                ||      ||

               Cowth Vader
`,
  ];

  const randomIndex = Math.floor(Math.random() * cows.length);
  return cows[randomIndex];
}

function renderTerminal() {
  terminal.innerHTML = "";
  outputLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed === "github.com/lowitea") {
      terminal.innerHTML += `<a href="https://github.com/lowitea" target="_blank">${line}</a>\n`;
    } else if (trimmed === "linkedin.com/in/lowit") {
      terminal.innerHTML += `<a href="https://www.linkedin.com/in/lowit" target="_blank">${line}</a>\n`;
    } else if (trimmed === "ea@lowit.ru") {
      terminal.innerHTML += `<a href="mailto:ea@lowit.ru">${line}</a>\n`;
    } else if (
      line.startsWith("echo") ||
      line.startsWith("ls") ||
      line.startsWith("cowsay")
    ) {
      terminal.innerHTML += `<span class="prompt">guest@lowit.ru:~$</span> ${line}\n`;
    } else {
      terminal.innerHTML += `${line}\n`;
    }
  });

  if (typingFinished) {
    terminal.innerHTML += `<span class="prompt">guest@lowit.ru:~$</span><span class="cursor"></span>`;
  }
}

function typeNextChar() {
  const command = commands[currentCommandIndex];
  const currentLine = command.slice(0, currentCharIndex + 1);

  outputLines[outputLines.length - 1] = currentLine;
  renderTerminal();

  currentCharIndex++;

  if (currentCharIndex < command.length) {
    setTimeout(typeNextChar, 30);
  } else {
    handleCommandExecution(command);
  }
}

function handleCommandExecution(command) {
  if (command.startsWith("cowsay")) {
    const message = command.match(/cowsay\s-r\s+"(.+?)"/)?.[1] ?? "";
    outputLines.push(getCowsayOutput(message));
  } else if (command.startsWith("echo")) {
    const text = command.replace("echo", "").trim();
    outputLines.push(text);
  } else if (command.startsWith("ls -l contacts")) {
    outputLines.push("  ea@lowit.ru");
    outputLines.push("  linkedin.com/in/lowit");
    outputLines.push("  github.com/lowitea");
  }

  outputLines.push("");
  currentCommandIndex++;
  currentCharIndex = 0;

  if (currentCommandIndex < commands.length) {
    outputLines.push("");
    setTimeout(typeNextChar, 500);
  } else {
    typingFinished = true;
    renderTerminal();
  }
}

outputLines.push("");
typeNextChar();
