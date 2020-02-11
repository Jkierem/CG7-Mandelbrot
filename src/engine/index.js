import { range } from '@juan-utils/functions'

export const createEngine = (w,max,width,height,p) => {
    return {
        get max(){ return max },
        get(){
            const h = (w * height) / width;
            const xmin = -w/2;
            const xmax = xmin + w
            const ymin = -h/2;
            const ymax = ymin + h
            const dx = (xmax-xmin)/(width)
            const dy = (ymax-ymin)/(height)

            const data = []

            let y = ymin;
            range(0,height).map( j => {
                let x = xmin;
                range(0,width).map( i => {
                    let [a,b]  = [x,y];
                    let n = 0;
                    while(n < max){
                        const aa = a * a;
                        const bb = b * b;
                        const twoab = 2.0 * a * b;
                        a = aa - bb + x;
                        b = twoab + y;
                        if(p.dist(aa, bb, 0, 0) > 16){
                            break;
                        }
                        n++;
                    }
                    data.push([i,j,n,max]);
                    x += dx;
                })
                y += dy;
            })
            return data;
        }
    }
}