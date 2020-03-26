export class Signal {
    private _callbacks: Record<any, (() => void)[]>

    public add(callback: () => void, context: any = null): void {
        this._callbacks[context].push(callback);
    }

    public removeAll(context: any = null): void {
        this._callbacks[context] = null;
    }

    public dispatch(): void {
        Object.values(this._callbacks).forEach((cbacks: (() => void)[]) => {
            cbacks.forEach((cbak: () => void) => {
                cbak();
            });
        })
    }
}