(function(window){
    // 'use strict';
    const input = document.querySelector('#AlmondText')
    function AlmondHangul() {
        input.addEventListener('keyup', parse)
    }

    function parse() {
        let output = []
        // let pattern = /[ñüa-zA-Z]/gi
        let chars = this.value.toLowerCase()
        // let chars_str = this.value.toLowerCase()
        // let chars = chars_str.match(pattern)

        
        for (var i in chars) {
          i = parseInt(i)
          var char = chars[i]
          var next = chars[i+1]
          var prev = chars[i-1]
          
          var match = abc.matches(char)
          if (match == 'vow') {
  
            const VOWELS = abc.vowels
            if ('yw'.includes(char) && next != undefined && abc.matches(next) == 'vow') {
              var vowel = VOWELS.get(char,next)
            } else if ('yw'.includes(prev)) {
              continue
            } else {
              if (char == 'u' && 'qg'.includes(prev)) {
                if ('ei'.includes(next) || next == undefined) {
                  continue
                } else {
                  var vowel = VOWELS.get(char)
                }
              } else {
                var vowel = VOWELS.get(char)
              }
            }
  
            var init = abc.vowels.init(char,prev,chars[i-2])
            var parsed = [init,vowel]
            output = output.concat(parsed)
  
  
          } else if (match == 'cons') {
            const CONSONANT = abc.consonants
            if ('cg'.includes(char) && (abc.matches(next) == 'vow' || next == 'h')) {
                var cons = CONSONANT.get(char,next)
              } else if (char == 'h' && prev != 'c') {
                continue
              }
               else {
                var cons = CONSONANT.get(char)
              }
            
            var init = CONSONANT.init(char,next)
            if (prev != undefined && char == 'l' && abc.matches(next) == 'vow') {
              var parsed = [cons,cons]
            } else if ('ln'.includes(char)) {
              var parsed = [cons]
            } else {
              var parsed = [cons,init]
            }
            output = output.concat(parsed)
          }
          
        }
        output = output.filter((item) => { return item != null })
        getHangul(output)
      }

      function getHangul(output) {
        let han = Hangul.assemble(output)
        let target_el = document.querySelector('#AlmondHangul')
        if (target_el != undefined) {
            target_el.innerText = han
        } else {
            console.log('Falta añadir el id #AlmondHangul al elemento que contendrá el valor en coreano !!')
        }
      }

      const abc = {
        matches: function(char) {
          var vows = Object.keys(abc.vowels)
          var consn = Object.keys(abc.consonants)
          if (vows.includes(char) == true) {
            return 'vow'
          } else if (consn.includes(char) == true) {
            return 'cons'
          }
        },
         vowels: {
              get: function(char,next) {
                  next = next || char
                  if (typeof this[char] == 'object') {
                    return this[char][next]
                  } else if (typeof this[char] == 'string') {
                    return this[char]
                  }
              },
              init: function(char,prev,qg) {
                if (prev == undefined) {
                  return 'ㅇ'
                } else if (prev == 'u' && 'qg'.includes(qg)) {
                  if ('aou'.includes(char)) {
                    return 'ㅇ'
                  } else if ('ei'.includes(char)) {
                    return null
                  }
                } else if (char == 'u' && 'qg'.includes(prev)) {
                  return null
                } else if (prev == 'h') {
                  if (qg == 'c') {
                    return null
                  } else {
                    return 'ㅇ'
                  }
                } else if (abc.matches(prev) == 'vow') {
                  return 'ㅇ'
                } else {
                  return null
                }
              },
              a: 'ㅏ',
              e: 'ㅔ',
              i: 'ㅣ',
              o: 'ㅗ',
              u: 'ㅜ',
              ü: 'ㅜ',
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
                  u: 'ㅜ',
                  ü: 'ㅜ'
              }
            },
            consonants: {
                get: function(char,next) {
                  next = next || char
                  if (typeof this[char] == 'object') {
                      return this[char][next]
                  } else if (typeof this[char] == 'string') {
                    return this[char]
                  }
                },
                init: function(char,next) {
                    if (next == undefined || abc.matches(next) == 'cons') {
                      return 'ㅡ'
                    } else if ('nl'.includes(char)) {
                      return null
                    } else {
                      return null
                    }
                },
                b: 'ㅂ',
                c: {
                    c: 'ㅋ',
                    a: 'ㅋ',
                    e: 'ㅅ',
                    i: 'ㅅ',
                    o: 'ㅋ',
                    u: 'ㅋ',
                    h: 'ㅊ'
                },
                d: 'ㄷ',
                f: 'ㅍ',
                g: {
                    g: 'ㄱ',
                    a: 'ㄱ',
                    e: 'ㅎ',
                    i: 'ㅎ',
                    o: 'ㄱ',
                    u: 'ㄱ', 
                    ü: 'ㄱ'
                },
                j: 'ㅎ',
                k: 'ㅋ',
                l: 'ㄹ',
                m: 'ㅁ',
                n: 'ㄴ',
                ñ: '니',
                p: 'ㅍ',
                q: 'ㅋ',
                r: 'ㄹ',
                s: 'ㅅ',
                t: 'ㅌ',
                v: 'ㅂ',
                x: ['크','ㅅ'],
                z: 'ㅉ'
            }
        }

 if(typeof(window.myWindowGlobalLibraryName) === 'undefined'){
    window.myWindowGlobalLibraryName = AlmondHangul();
  }

})(window);