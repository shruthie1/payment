export class UpiIds {
    static paytm1 = 'Q210249262@ybl';
    static paytm2 = "BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=";
    static paytm3 = 'Q137045557@ybl';
    static ppay = 'paytmqr281005050101jnirp1ueoe1y@paytm';
    static bpayGen = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=';
    static bpay2 = 'paytmqr281005050101rgcfsaeesx4o@paytm';
    static axisUPI = 'reddygirl@airtel';
    static gpay = 'Q137045557@ybl';
    static gpayid = 'reddygal@postbank';
    static defaultId = 'myred1808@postbank';
    static qrId = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=';

    static getUpiId(key) {
        return UpiIds[key];
    }

    static setUpiId(key, value) {
        UpiIds[key] = value;
    }

    static defaultUpis = {
        phonepe: UpiIds.ppay,
        gpay: UpiIds.gpay,
        paytm: UpiIds.paytm1,
        others: UpiIds.defaultId
    }

    static setDefaultUpis(){
        UpiIds.defaultUpis = {
            phonepe: UpiIds.ppay,
            gpay: UpiIds.gpay,
            paytm: UpiIds.paytm1,
            others: UpiIds.defaultId
        }
    }
}

export function assigntoUpis(jsonData) {
    Object.entries(jsonData).forEach(([key, value]) => {
        if (UpiIds.hasOwnProperty(key)) {
            UpiIds.setUpiId(key, value);
        }
    });
    UpiIds.setDefaultUpis()
}

export async function setUpiIds() {
    try {
        const response = await fetch("https://mytghelper.glitch.me/getAllUpiIds");
        const data = await response.json();
        assigntoUpis(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getClients() {
    const url = `https://mytghelper.glitch.me/maskedcls`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}