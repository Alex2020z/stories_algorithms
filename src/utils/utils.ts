export const isNumeric =(str: any) => {
    if (typeof str != "string") return false;
    return !isNaN(parseInt(str));
}

//https://www.codewars.com/kata/587731fda577b3d1b0001196/train/typescript
export function camelCase(str: string): string {
    if (str === "") return str;
    return str.trim().split(' ').map(item => item[0].toUpperCase() + item.substring(1)).join().replace(/,/g, '');
  }

//https://www.codewars.com/kata/57c15d314677bb2bd4000017/train/typescript  
/*
In the morning all the doors in the school are closed. The school is quite big: there are N doors. Then pupils start coming. It might be hard to believe, but all of them want to study! Also, there are exactly N children studying in this school, and they come one by one.
When these strange children pass by some doors they change their status (i.e. Open -> Closed, Closed -> Open). Each student has their number, and each i-th student alters the status of every i-th door. For example: when the first child comes to the schools, he changes every first door (he opens all of them). The second one changes the status of every second door (he closes some doors: the 2nd, the 4th and so on). Finally, when the last one – the n-th – comes to the school, he changes the status of each n-th door (there's only one such door, though).
You need to count how many doors are left opened after all the students have come.
*/
  export  const doors = (n: number): number => {
    const arr: Array<boolean> = new Array(n).fill(false);
    
    for (let i = 0; i < n; i ++) {
      for (let j = i; j < n; j += (i+1)) {
        arr[j] = !arr[j];
        //console.log('i=', i, ' j=', j);
      }
    }
    
    let count = 0;
    for (let i = 0; i < n; i ++) {
      if (arr[i]) count ++;
    }
    return count;
}

