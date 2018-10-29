on run argv
        tell application "Terminal"
                activate
				
                if argv = {} then
                        tell application "System Events"
                                keystroke "n" using {command down}
                        end tell
                else
                        do script argv
                end if
        end tell
end run
