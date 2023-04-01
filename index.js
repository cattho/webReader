const textArea = document.getElementById('text');
const voiceList = document.getElementById('voice');
const speechbtn = document.getElementById('btnSubmit');
const themebtn = document.getElementById('toggleTheme');
const synth = speechSynthesis;
let isSpeaking = true;

const toggleTheme = () => {
    themebtn.addEventListener('click', () => {
        let theme = document.getElementById('containerApp')

        if (theme.classList.contains('bg-white')) {
            setTimeout(() => {
                theme.classList.remove('bg-white')
                theme.classList.add('bg-gray-800')
            }, 200)
        } else if (theme.classList.contains('bg-gray-800')) {
            setTimeout(() => {
                theme.classList.remove('bg-gray-800')
                theme.classList.add('bg-white')
            }, 200)

        }
    })
}

const voiceSpeech = () => {
    if (synth && synth.getVoices) {
        for (let voice of synth.getVoices()) {
            let option = document.createElement('option')
            option.text = voice.name
            voiceList.add(option)
        }
    }
}

synth.addEventListener('voiceschanged', voiceSpeech)

const textToSpeech = (text) => {
    let utternance = new SpeechSynthesisUtterance(text)
    let selectedVoice = synth.getVoices().find(voice => voice.name === voiceList.value)
    utternance.voice = selectedVoice || synth.getVoices()[0]
    speechSynthesis.speak(utternance)
}

speechbtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (textArea.value !== '') {
        if (!synth.speaking) {
            textToSpeech(textArea.value)
            isSpeaking = true
        }
        if (isSpeaking) {
            synth.resume()
            isSpeaking = false
            speechbtn.innerHTML = 'Pause reading'
        } else {
            synth.pause()
            isSpeaking = true
            speechbtn.innerHTML = 'Resume reading'
        }
        setTimeout(() => {
            if (!synth.speaking && !isSpeaking) {
                isSpeaking = true
                speechbtn.innerHTML = 'Read'
            }
        }, 1000)
    } else {
        speechbtn.innerHTML = 'Read'
    }
}
)


