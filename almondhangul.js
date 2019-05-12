(function(window){
    // 'use strict';
    const input = document.querySelector('#AlmondText')
    function AlmondHangul() {
        input.addEventListener('keyup', parse)
    }

    function parse() {
        let chars = get_chars(this.value)
        var output = []
        for (var i in chars) {
            let char = chars[i]
            let check_char = /^[ña-zA-Z]*$/g.test(char)
            if ( check_char == true) {
                let prev = chars[parseInt(i) - 1]
                let next = chars[parseInt(i) + 1]
                var is_vowel = isVowel(char)
                if (is_vowel == false) {
                    // var consonant = abc.consonants[char]
                    let parsing = parseConsonant(char,prev,next)
                    output = output.concat(parsing)
                } else {
                    let parsing = parseVowel(char,prev,next)
                    output = output.concat(parsing)
                }
            } else if (check_char == false) {
                output.push(char)
            }
        }
        let han = Hangul.assemble(output)
        let target_el = document.querySelector('#AlmondHangul')
        if (target_el != undefined) {
            target_el.innerText = han
        } else {
            console.log('Falta añadir el id #AlmondHangul al elemento que contendrá el valor en coreano !!')
        }
    }

    function isVowel(char) {
        let vowel = abc.vowels[char]
        if (vowel == undefined) {
            var result = false
        } else {
            var result = true
        }
        return result
    }

    function get_chars(input) {
        let input_str = input.toLowerCase();
        let flat_str = input_str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        let chars = flat_str.split('')
        return chars
    }

    function parseConsonant(char,prev,next) {
        if (char == 'h') {
            var parsed = []
        } else {
            let consonant = abc.consonants[char]
            if (char == 'n') {
                var parsed = [consonant]
            } else {
                var next_is_vowel = isVowel(next)
                var prev_is_vowel = isVowel(prev)

                var needs_init = false
                if (next == undefined || next_is_vowel == false) {
                    needs_init = true
                }
                
                if (char == 'l' && next_is_vowel == true && prev_is_vowel == true) {
                    var parsed = [consonant,consonant]
                } else {
                    var parsed = [consonant]
                }
    
                if (needs_init == true && char != 'l' || needs_init == true && char == 'l' && prev_is_vowel == false ) {
                    var init = abc.consonants.init
                    parsed.push(init)
                }
            }
        }
        return parsed
    }

    function parseVowel(char,prev,next) {
        var prev_is_vowel = isVowel(prev)
        var next_is_vowel = isVowel(next)
        var needs_init = false
        if (prev == undefined || prev == 'h' || 'yw'.indexOf(prev) == -1 && prev_is_vowel == true) {
            needs_init = true
        }
        if ('gq'.indexOf(prev) != -1 || 'yw'.indexOf(prev) != -1) {
            var parsed = []
        } else if ('yw'.indexOf(char) != -1) {
            if (next_is_vowel == true) {
                var vowel = abc.vowels[char][next]
            } else {
                var vowel = abc.vowels[char][char]
            }
            var parsed = [vowel]
        } else {
            let vowel = abc.vowels[char]
            var parsed = [vowel]
        }
        
        if (needs_init == true) {
            var init = abc.vowels.init
            parsed.unshift(init)
        }
        return parsed
    }

  

  const abc = {
          vowels: {
            init: 'ㅇ',
            a: 'ㅏ',
            e: 'ㅔ',
            i: 'ㅣ',
            o: 'ㅗ',
            u: 'ㅜ',
            y: {
                y: 'ㅣ',
                a: 'ㅑ',
                e: 'ㅖ',
                i: 'ㅣ',
                o: 'ㅛ',
                u: 'ㅠ'
            },
            w: {
                w: 'ㅜ',
                a: 'ᅪ',
                e: 'ㅞ',
                i: 'ᅱ',
                o: 'ㅝ',
                u: 'ㅜ'
            }
          },
          consonants: {
              init: 'ㅡ',
              b: 'ㅂ',
              c: 'ㅋ',
              ch: 'ㅊ',
              d: 'ㄷ',
              f: 'ㅍ',
              g: 'ㄱ',
              j: 'ㅎ',
              k: 'ㅋ',
              l: 'ㄹ',
              m: 'ㅁ',
              n: 'ㄴ',
              ñ: '니',
              p: 'ㅍ',
              q: 'ᄏ',
              r: 'ㄹ',
              s: 'ㅅ',
              t: 'ㅌ',
              v: 'ㅂ',
              x: '크',
              z: 'ㅉ'
          }
      }
 if(typeof(window.myWindowGlobalLibraryName) === 'undefined'){
    window.myWindowGlobalLibraryName = AlmondHangul();
  }

})(window);