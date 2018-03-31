(function(){
    window.abc = 'testing'

    abc = {}

    abc.mag = function(){
        console.log('hey')
    }

    window.abc = abc

})()