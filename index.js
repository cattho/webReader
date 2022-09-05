const textArea = document.getElementById('text');
let voiceList = document.getElementById('voice');
let speechbtn = document.getElementById('btnSubmit');
let synth = speechSynthesis;
let isSpeaking = true;

const voiceSpeech = () => {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option')
        option.text = voice.name
        voiceList.add(option)
    }
}

synth.addEventListener('voiceschanged', voiceSpeech)

const textToSpeech = (text) => {
    let utternance = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice
        }
    }
    speechSynthesis.speak(utternance)
}

speechbtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (textArea.value != '') {
        if (!synth.speaking) {
            textToSpeech(textArea.value)
        }
        if (textArea.value.length > 80) {
            if (isSpeaking) {
                synth.resume()
                isSpeaking = false
                speechbtn.innerHTML = 'Pause reading'
            } else {
                synth.pause()
                isSpeaking = true
                speechbtn.innerHTML = 'Resume reading'
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true
                    speechbtn.innerHTML = 'Read'
                }
            })
        } else {
            speechbtn.innerHTML = 'Read'
        }
    }
})