@rem  [jscheck.bat]
@rem
@rem  Uses the Google Closure Compiler
@rem  to type-check functions.js
@rem
@rem  To be able to do this, you have to download
@rem  and set up the path of closure-compiler.jar
@rem
@rem  Though this is a Windows batch file, the 'java'
@rem  command syntax on other platforms is the same

cls

java -jar closure-compiler.jar ^
        --compilation_level SIMPLE ^
        --checks-only ^
        --jscomp_warning=reportUnknownTypes -W VERBOSE ^
        ^
        functions_defs.js ^
        functions.js ^
        ^
        2>> jscheck.txt

type jscheck.txt

@rem end
