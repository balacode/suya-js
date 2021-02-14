:: -----------------------------------------------------------------------------
:: SuyaJS JavaScript Library                               suya-js/[jscheck.bat]
:: (c) balarabe@protonmail.com                                      License: MIT
:: -----------------------------------------------------------------------------

:: Uses the Google Closure Compiler
:: to type-check functions.js
::
:: To be able to do this, you have to download
:: and set up the path of closure-compiler.jar
::
:: Though this is a Windows batch file, the 'java'
:: command syntax on other platforms is the same

@ set JAVA="C:\Program Files\Java\jdk1.8.0_101\jre\bin\java.exe"
@ set CLOSURE="X:\user\bin\closure-compiler.jar"

cls

%JAVA% -jar %CLOSURE% ^
    --compilation_level SIMPLE ^
    --checks-only ^
    --jscomp_warning=reportUnknownTypes -W VERBOSE ^
    ^
    functions_defs.js ^
    functions.js ^
    ^
    2>> jscheck.txt

type jscheck.txt

:: end
