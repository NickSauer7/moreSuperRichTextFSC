# moreSuperRichTextFSC
Enhanced version of superRichTextFSC - allows selection of full or small in-line buttons/actions

1)	Block disallowed words and symbols
    a.	Control whether this is a hard block or not.
    b.	Allow setting of Toast Mode, Message and Type.
2)	Search and Replace custom text
3)	Search and Replace branded/suggested words
4)	Revert mass changes
5)	Control allowance of ‘Previous’ Navigation.


|Parameter	               |I	   |O	   |Information 
|--------------------------|-----|-------|-------------------------------------------------------------------------------|
|allowBack	               |X	   |       |Determines whether or not Screen shows Previous navigation (default => false)  |
|autoReplaceMap	           |X	   |       |JSON formatted key:value map.  (example => {"Test": "GreatTest™"} )            |
|disallowedSymbols	       |X	   |       |Regex for disallowed symbols  (example => [&\/\\@] )                           |
|disallowedWords	         |X     |	   |Regex for disallowed words  (example => (badterm)\b )                          |
|disallowedSymbolsMessage  |X	   |       |Message to show when disallowed symbols used (example => Invalid Symbols)      |
|disallowedWordsMessage	   |X	   |	   |Message to show when disallowed words used (example => Invalid Words)          |
|disallowedSymbolsType	   |X	   |       |Toast message type for disallowed symbols usage (default => error)             |
|disallowedSymbolsMode	   |X	   |       |Toast message mode for disallowed symbols usage (default => sticky)            |
|disallowedSymbolsType	   |X	   |       |Toast message type for disallowed words usage (default => error)               |
|disallowedSymbolsMode	   |X	   |       |Toast message mode for disallowed words usage (default => sticky)              |
|fullButton	   |X	   |       |Set to true to get centered large buttons/inputs.  Otherwise will be in-line icons (default => false)              |
|hardBlock	               |X	   |	   |If True, then block ‘Next’ action until error resolved (default => false)      |
|richText	               |X	   |X	   |Input and output RichText that you’ll be editing                               |
