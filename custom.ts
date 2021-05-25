//use last entry in melody to define poly or mono ? 
//use classes for melody ?

let stepLength = 50
//added a comment to test push
let noteFreq: number[] = [131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494, 523, 555, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988]
let myScales: number[][] = [
    [0, 4, 5, 7, 10, 12, 13, 13, 5, 10], 
    [0, 1, 4, 5, 7, 8, 11, 12, 13, 13],
    [0, 3, 6, 7, 9, 12, 7, 0, 12, 13],
    [0, 13, 2, 3, 13, 5, 6, 7, 8, 9],
    [1, 3, 6, 8, 10, 1, 3, 13, 13, 13]
    ]


let octaves: number[] = [ 1, 2, 4, 6 ];
let availReps: number[] = [ 2, 2, 4, 4, 4, 4, 8, 8, 1 ];
let availTimesigs: number[] =  [6, 6, 6, 10, 7, 8, 8, 8, 8, 8];
let availmodReps: number[] =  [1, 1, 2, 3, 4, 8] ;
let currentMelody: number[] = [ 0, 4, 7, 0, 1, 5, 8, 1 ];
let melodyOctaves: number[] = [ 2, 3, 3, 3, 0, 3, 3, 2 ];
let currentRhythm: number[] = [1,4,4,4,2,4,4,4];

/*
const int scales[50] = {
  0, 4, 5, 7, 10, 12, 13, 13, 5, 10, //mopho
  0, 1, 4, 5, 7, 8, 11, 12, 13, 13, //oriental
  0, 3, 6, 7, 9, 12, 7, 0, 12, 13, //minor
  0, 13, 2, 3, 13, 5, 6, 7, 8, 9, //chromo
  1, 3, 6, 8, 10, 1, 3, 13, 13, 13 //pentatonic
};
*/

enum scaleSelector {
    //% block="mopho"
    mopho = 0,
    //% block="oriental"
    oriental = 1,
    //% block="minor"
    minor = 1,
    //% block="chromatic"
    chromatic = 1,
    //% block="pentatonic"
    pentatonic = 1,
}

enum rootNote {
    //% block="C"
    C = 0,
    //% block="C#"
    CSharp = 1,
    //% block="D"
    D = 2,
    //% block="D#"
    DSharp = 3,
    //% block="E"
    E = 4,
    //% block="F"
    F = 5,
    //% block="F#"
    FSharp = 6,
    //% block="G"
    G = 7,
    //% block="G#"
    GSharp = 8,
    //% block="A"
    A = 9,
    //% block="A#"
    ASharp = 10,
    //% block="B"
    B = 11
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace generativeMelody {
    
    export class Sequence {
        seqData: number[];
        seqLength: number;
        polyphony: boolean; // false = mono, true = poly
        melodyType: string;
        rootNote: number;
        scale: number;
        /*
        constructor(sequence: number[], length: number, polyphony: boolean, melodyType: string, rootyNote: number, scale: number) {
            this.seqLength = length;
            this.seqData = sequence;
            this.melodyType = melodyType;
            this.polyphony = polyphony;
            this.rootNote = rootyNote;
            this.scale = scale;
        }
        */

    }

    /**
     * TODO: describe your function here
     * @param rootNote describe parameter here, eg: 5 
     * @param scale describe parameter here, eg: "Hello"
     */
    //% block="Create melody,  length = $length rootNote = $rootNote scale = $selectedScale"
    //% length.defl=8
    //% blockSetVariable=myMelody
    export function create(length: number, rootNote: rootNote, selectedScale: scaleSelector): Sequence {
        let tempMelody = [0]
        for(let i = 0; i< length; i++){
            if(randint(0,4)>1){
                tempMelody[i] = myScales[selectedScale][randint(0,myScales[selectedScale].length-1)]
            } else {
                tempMelody[i] = 222
            }
   
        }
        let tempSeq = new Sequence
        tempSeq.melodyType="default"
        tempSeq.rootNote = rootNote
        tempSeq.scale = selectedScale
        tempSeq.seqData = tempMelody
        tempSeq.seqLength = tempSeq.seqData.length
        return tempSeq
    }

//DEBUG
//let testSeq = create(8,0,0)
//serial.writeNumbers(testSeq.seqData)

    /**
     * TODO: describe your function here
     * @param rootNote describe parameter here, eg: 5 
     * @param scale describe parameter here, eg: "Hello"
     */
    
    //% blockSetVariable=myMelody
    //% block="Alter melody,  $melodyToAlter=variables_get(myMelody) amount = $amount rootNote = $rootNote scale = $selectedscale"
    //% inlineInputMode=inline
    export function alterMelody(melodyToAlter: number[], rootNote: rootNote, selectedscale: scaleSelector, amount: number): number[]{
        if(amount > 100){amount = 100}
        if(amount < 0){amount = 0}
        let tempMelody = [0]
        for(let i = 0; i< melodyToAlter.length; i++){
            if(randint(0,4)>1){
                tempMelody[i] = myScales[selectedscale][randint(0,myScales[selectedscale].length-1)]
            } else {
                tempMelody[i] = melodyToAlter[i]
            }
        }
        return tempMelody
    }



    function noteToBit(noteIn: number): number{
        let noteAsBit = 0b0000000000000000
        if(noteIn !=0){
            noteAsBit = 0b0000000000000001
            for(let i = 0; i<noteIn; i++){
                noteAsBit = noteAsBit<<i
            }  
        }
        
        return noteAsBit
    }


    /**
     * TODO: describe your function here
     * @param rootNote describe parameter here, eg: 5 
     * @param scale describe parameter here, eg: "Hello"
     */
    //% block="Old Generate polyphonic melody,  length = $length rootNote = $rootNote scale = $selectedscale"
    //% length.defl=8
    //% blockSetVariable=myMelodyPoly
    export function generatePolyMelody(length: number, rootNote: rootNote, selectedscale: scaleSelector): number[] {
        let tempMelody = [0]
        for(let i = 0; i< length; i++){
            if(randint(0,4)>1){
                tempMelody[i] = myScales[selectedscale][randint(0,myScales[selectedscale].length-1)]
            } else {
                tempMelody[i] = 222
            }
            
        }
        return tempMelody
    }



    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function playMelody(melodyToPlay: Sequence, transpose: number) {
        for(let i = 0; i<melodyToPlay.seqData.length; i++){
            if(melodyToPlay.seqData[i] == 222){
                basic.pause (stepLength*2)
            } else {
            music.playTone(noteFreq[melodyToPlay.seqData[i]+transpose], stepLength)
            basic.pause(stepLength)
            }
        }
    }
}


