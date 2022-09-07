function filterAndSetBoolean(arr, index, searchTerm) {

    // Get each word
    function filterIt(terms, arr) {
        if (null === terms && terms.lenght < 3) return arr;
        // let words = terms.match(/"[^"]+"|.+/g);
        let words = terms.split(" ");
      console.log(words);
        words = words.map(val => val.replace(/\"/g, ""));

        return arr.filter((a) => {
          const v = Object.values(a);
          const f = JSON.stringify(v).toLowerCase();
          let result = words.every(val => f.includes(val))
          return result;
        });
      };

      
    // Filter by color
    const list = arr.map(e => e[index]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    if(!searchTerm) {
      return false;
    } else {
      return true;
      }
    }

module.exports = filterAndSetBoolean;