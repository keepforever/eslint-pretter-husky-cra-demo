## Motivations:

1. Regardless to how you zoom, when reviewing a PR request on github, the window only shows you about **120** columns of code. Anything wider than that and you must scroll left/right to bring it into view.  **Thus, setting prettier's `printWidth: 120` will alleviate that burden.**

2. Uniform styling across all projects (or, at minimum, across all files at the individual project level), as enforced by committed config files such as `eslintrc.json` and `.prettierrc`, will allow developers to leverage editors built in prettier and eslint integration to help format and validate their code without "dirtying" an entire file's diff when you've only made a change to a couple lines.

3. "One expression per line" is more human readable for non-authors of code who do not have intimate familiarity with the motivation for the logic being implemented.


## Helpful Links

[Why Prettier?](https://prettier.io/docs/en/why-prettier.html).

[Prettier vs Linters](https://prettier.io/docs/en/comparison.html).

[husky](https://github.com/typicode/husky).



