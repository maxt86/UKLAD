const mapping = [
  'а', 'a',
  'б', 'b',
  'в', 'v',
  'г', 'ğ',
  'ґ', 'g',
  'д', 'd',
  'е', 'e',
  'ж', 'ž',
  'з', 'z',
  'и', 'y',
  'і', 'i',
  'к', 'k',
  'л', 'l',
  'м', 'm',
  'н', 'n',
  'о', 'o',
  'п', 'p',
  'р', 'r',
  'с', 's',
  'т', 't',
  'у', 'u',
  'ф', 'f',
  'ц', 'c',
  'ч', 'č',
  'ш', 'š',
]

const soft = [
  'з', 'ź',
  'л', 'ľ',
  'н', 'ń',
  'с', 'ś',
  'ц', 'ć',
]

const specCyr    = ['д', 'т']
const specLat    = ['ď', 'ť']
const specLatCap = ['Ď', 'Ť']

const consonants = 'бвгґджзклмнпрстфхцчшщ'
const latinConsonants = 'bvğgdžzklmnprstfchšč'

const twoLettered = [
  'х', 'ch',
  'щ', 'šč',
]

const apostrophes = ["'", "’"]

const softVowels = ['є', 'ї', 'ю', 'я']

const hardParts = [
  'є', 'e',
  'ю', 'u',
  'я', 'a',
]

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toLatin(data) {
  let res = ''
  
  let prev = '\n'
  let i = 0
  for (let c of data.cyrillic) {
    let lc = c.toLowerCase()
    
    if (mapping.includes(lc) && mapping.indexOf(lc)%2 == 0) {
      
      let added = mapping[mapping.indexOf(lc)+1]
      res += (c == lc) ? added : capitalize(added)
      
    } else if (lc == 'ь') {
      
      let next = data.cyrillic[i+1] || '\n'
      let ln = next.toLowerCase()
      if (ln == 'о') {
        
        res += (next == ln) ? 'j' : 'J'
        
      } else {
        
        res = res.slice(0, -1)
        
        let lp = prev.toLowerCase()
        if (soft.includes(lp) && soft.indexOf(lp)%2 == 0) {
          
          let added = soft[soft.indexOf(lp)+1]
          res += (prev == lp) ? added : capitalize(added)
          
        } else if (specCyr.includes(lp)) {
          
          res += (prev == lp)
              ? specLat[specCyr.indexOf(lp)]
              : specLatCap[specCyr.indexOf(lp)]
          
        }
        
      }
        
    } else if (lc == 'й') {
      
      let next = data.cyrillic[i+1] || '\n'
      let ln = next.toLowerCase()
      if (ln == 'о') {
        
        if (prev != '' && consonants.includes(prev.toLowerCase())) {
          res += (c == lc) ? 'į' : 'Į'
        } else {
          res += (c == lc) ? 'j' : 'J'
        }
        
      } else {
        
        res += (c == lc) ? 'į' : 'Į'
        
      }
      
    } else if (twoLettered.includes(lc) && twoLettered.indexOf(lc)%2 == 0) {
      
      let added = twoLettered[twoLettered.indexOf(lc)+1]
      res += (c == lc) ? added : capitalize(added)
      
    } else if (softVowels.includes(lc)) {
      
      let apostrophe = false
      if (apostrophes.includes(prev)) {
        res = res.slice(0, -1)
        apostrophe = true
      }
      
      if (lc == 'ї') {
        
        res += (c == lc) ? 'j' : 'J'
        
        if (apostrophe) {
          res += (c == lc) ? 'i' : 'I'
        } else {
          res += 'i'
        }
        
      } else {
        
        if (apostrophe) {
          
          res += (c == lc) ? 'į' : 'Į'
          
        } else {
          
          res += (c == lc) ? 'j' : 'J'
          
        }
        
        let added = hardParts[hardParts.indexOf(lc)+1]
        if (apostrophe) {
          res += (c == lc) ? added : capitalize(added)
        } else {
          res += added
        }
        
      }
      
    } else {
      
      res += c
      
    }
    
    prev = c
    i++
  }
  
  data.latin = res
}

function toCyrillic(data) {
  let res = ''
  
  let prev = '\n'
  let i = 0
  let ignoreChars = 0
  for (let c of data.latin) {
    if (ignoreChars > 0) {
      prev = c
      i++
      
      ignoreChars--
      
      continue
    }
    
    let twoLetters = data.latin.slice(i, i+2) || c
    let ltl = twoLetters.toLowerCase()
    let lc = c.toLowerCase()
    if (twoLettered.includes(ltl) && twoLettered.indexOf(ltl)%2 != 0) {
      
      let added = twoLettered[twoLettered.indexOf(ltl)-1]
      res += (twoLetters == ltl) ? added : capitalize(added)
      
      ignoreChars = 1
      
    } else if (soft.includes(lc) && soft.indexOf(lc)%2 != 0) {
      
      let added = soft[soft.indexOf(lc)-1]
      res += (c == lc) ? added : capitalize(added)
      
      let next = data.latin[i+1] || '\n'
      let ln = next.toLowerCase()
      res += (next == ln) ? 'ь' : 'Ь'
      
    } else if (specLat.includes(c)) {
      
      res += specCyr[specLat.indexOf(c)]
      
      let next = data.latin[i+1] || '\n'
      let ln = next.toLowerCase()
      res += (next == ln) ? 'ь' : 'Ь'
      
    } else if (specLatCap.includes(c)) {
      
      res += capitalize(specCyr[specLatCap.indexOf(c)])
      
      let next = data.latin[i+1] || '\n'
      let ln = next.toLowerCase()
      res += (next == ln) ? 'ь' : 'Ь'
      
    } else if (lc == 'j') {
      
      let next = data.latin[i+1] || '\n'
      let ln = next.toLowerCase()
      if (ln == 'i') {
        
        let lp = prev.toLowerCase()
        if (latinConsonants.includes(lp) && next != ln) {
          res += "'"
        }
        
        res += (c == lc) ? 'ї' : 'Ї'
        
        ignoreChars = 1
        
      } else if (ln == 'o') {
        
        let lp = prev.toLowerCase()
        if (latinConsonants.includes(lp)) {
          res += (c == lc) ? 'ь' : 'Ь'
        } else {
          res += (c == lc) ? 'й' : 'Й'
        }
        
      } else if (hardParts.includes(ln) && hardParts.indexOf(ln)%2 != 0) {
        
        let added = hardParts[hardParts.indexOf(ln)-1]
        res += (c == lc) ? added : capitalize(added)
        
        ignoreChars = 1
        
      }
      
    } else if (lc == 'į') {
      
      let next = data.latin[i+1] || '\n'
      let ln = next.toLowerCase()
      if (ln == 'o') {
        
        res += (c == lc) ? 'й' : 'Й'
        
      } else if (hardParts.includes(ln) && hardParts.indexOf(ln)%2 != 0) {
        
        res += "'"
        
        let added = hardParts[hardParts.indexOf(ln)-1]
        res += (next == ln) ? added : capitalize(added)
        
        ignoreChars = 1
        
      } else {
        
        res += (c == lc) ? 'й' : 'Й'
        
      }
      
    } else if (mapping.includes(lc) && mapping.indexOf(lc)%2 != 0) {
      
      let added = mapping[mapping.indexOf(lc)-1]
      res += (c == lc) ? added : capitalize(added)
      
    } else {
      
      res += c
      
    }
    
    prev = c
    i++
  }
  
  data.cyrillic = res
}

document.addEventListener('alpine:init', () => {
  Alpine.data('data', () => ({
    'cyrillic': '',
    'latin': '',
  }))
})
