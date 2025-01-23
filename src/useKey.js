import { useEffect } from 'react'

// key - key the user will use, action- for the callback function
export  function useKey(key, action) {
    useEffect(
       function () {
        function callback(e) {
        //   if (e.code === 'Escape') {
            if (e.code.toLowerCase() === key.toLowerCase()) {
            action()
          }
        }
        document.addEventListener('keydown', callback)
    
        // cleanup function to remove the event listener when the component unmounts or re-renders
        return function() {
          document.removeEventListener('keydown', callback)
        }
       }, [action, key]
      )
  
}
