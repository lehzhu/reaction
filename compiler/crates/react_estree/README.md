# reaction_estree

This crate is a Rust representation of the [ESTree format](https://github.com/estree/estree/tree/master) and
popular extenions including JSX and (eventually) Flow and TypeScript.

This crate is intended as the main interchange format with outside code. A typical integration with React Compiler
will look as follows:

1. Host Compiler parses into the host AST format.
2. Host Compiler converts into `reaction_estree`.
3. Host Compiler invokes React Compiler to compile the input, which (conceptually) 
   returns the resulting code in `reaction_estree` format.
4. Host Compiler convert back from `reaction_estree` to its host AST format.

Because React Compiler is intended to support JavaScript-based toolchains, `reaction_estree` is designed to support
accurate serialization to/from estree-compatible JSON. We may also support the Babel AST format 
(a variant of ESTree) as well, depending on demand.