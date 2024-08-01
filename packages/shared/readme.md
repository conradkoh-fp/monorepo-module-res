# Shared Component Library
## Vite
### Q: Why use Vite instead of Webpack?
Because it just got working faster, with less configuration, to achieve the following criteria
1. Allow imports from the root of the package like `import { ... } from 'shared'
2. Allow imports from a sub-folder like `import translations from 'shared/dist/utils/translations'
3. Emit type delcarations + jump to source
4. Multiple entry points
5. Dev mode (rebuild when files are changed)

I believe the same would have been possible with Webpack eventually. Here are some reasons why Vite is probably a good choice.
1. Reduces complexity - less configuration and has a dedicated library mode
2. Better Developer Experience
    - Vite uses esbuild for the dev server, which is known to be very fast
    - Is able to use optimisations because it supports primarily ES Modules - which enables lazy loading of dependencies
    - Generally better HMR because of native ESM imports