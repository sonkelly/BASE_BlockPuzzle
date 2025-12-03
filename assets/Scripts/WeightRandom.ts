export default class WeightRandom {
    private weightArr: any[] = [];

    public weightAdd(value: any, weight: number): void {
        if (weight !== 0) {
            for (let i = 0; i < weight; i++) {
                this.weightArr.push(value);
            }
        }
    }

    public weightDeleteAll(value: any): void {
        let firstIndex = -1;
        let count = 0;
        
        for (let i = 0; i < this.weightArr.length; i++) {
            if (value === this.weightArr[i]) {
                count++;
                if (firstIndex === -1) {
                    firstIndex = i;
                }
            }
        }
        
        if (firstIndex !== -1) {
            this.weightArr.splice(firstIndex, count);
        }
    }

    public weightDeleteSingle(value: any): void {
        for (let i = 0; i < this.weightArr.length; i++) {
            if (value === this.weightArr[i]) {
                this.weightArr.splice(i, 1);
                break;
            }
        }
    }

    public weightNext(): any {
        if (this.weightArr.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.weightArr.length);
        return this.weightArr[randomIndex];
    }
}