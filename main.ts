function hourGlass(): void {
    for(let i:number = 0; i < 5; i++){
     led.plot(i,0)
     }
    for(let i:number = 1; i < 4; i++){
     led.plot(i, 1)
    }
    led.plot(2,2)
    for (let i: number = 1; i < 4; i++) {
    led.plot(i, 3)
    }
    for (let i: number = 0; i < 5; i++) {
     led.plot(i, 4)
    }
}
enum State{
    Passive,
    Started,
    Running
}

let state: State = State.Passive;

input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    state = State.Started
    hourGlass()
    control.runInBackground(() => music.playTone(440, 200))
    const waitTime = randint(3, 6) * 1000
    basic.pause(waitTime)

let falseA = input.buttonIsPressed(Button.A)
let falseB = input.buttonIsPressed(Button.B)

if(falseA && falseB){
    basic.showIcon(IconNames.Sad)
    control.runInBackground(() => music.playTone(800, 200))
    state = State.Passive
}
if(falseA){
    basic.showString("B")
    control.runInBackground(() => music.playTone(200, 200))
    state = State.Passive
}
if (falseB) {
    basic.showString("A")
    control.runInBackground(() => music.playTone(200, 200))
    state = State.Passive
}else {
state = State.Running
basic.showIcon(IconNames.Pitchfork)
control.runInBackground(() => music.playTone(600, 200))
}
})

basic.forever(function(){
 if(state === State.Running){
     
    let pressedA = input.buttonIsPressed(Button.A)
    let pressedB = input.buttonIsPressed(Button.B)

    if(pressedA && pressedB){
        basic.showIcon(IconNames.Square)
        control.runInBackground(() => music.playTone(440, 200))
        state = State.Passive
    }else if(pressedA){
        basic.showString("A")
        control.runInBackground(() => music.playTone(200, 200))
        state = State.Passive
    }else if (pressedB) {
        basic.showString("B")
        control.runInBackground(() => music.playTone(200, 200))
        state = State.Passive
    }
    basic.pause(20)
}
})

