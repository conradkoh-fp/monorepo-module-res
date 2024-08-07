# Shared Component Library
## No Build
### Q: Why not use a builder for the shared library
1. Use only typescript as the source
2. Probably easier time with HMR (assumed)

There are some challenges using no build
1. Ensure proper module resolution rather than hacks by referencing source files
    - Solution: Do not use ts-loader in webpack, since ts-loader has issues resolving files
        - This may require some work on the one-web side to get working, but may overall yield benefits
2. Configuring the tsconfig.json to ensure that ts files can be imported (set the `module` and `moduleResolution` properties to `ESNext` and `Bundler` respectively)
    - We need to research more on what the differences between the options are