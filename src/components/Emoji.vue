<template>
    <img :width="this.currentSize" :height="this.currentSize" :src="this.moodToSvg.src" :alt="this.moodToSvg.alt">
</template>

<script>
    export default {
        props: ['mood', 'size'],
        computed: {
            moodToSvg() {
                let emoFileName;
                let emoAlt = 'current mood - ';
                switch (this.mood) {
                case '-5':
                    emoFileName = 'Emoji_u1f62d.svg';
                    emoAlt += 'apocalyptic';
                    break;
                case '-4':
                    emoFileName = 'Emoji_u1f62b.svg';
                    emoAlt += 'horrible';
                    break;
                case '-3':
                    emoFileName = 'Emoji_u1f622.svg';
                    emoAlt += 'very bad';
                    break;
                case '-2':
                    emoFileName = 'Emoji_u1f615.svg';
                    emoAlt += 'bad';
                    break;
                case '-1':
                    emoFileName = 'Emoji_u1f612.svg';
                    emoAlt += 'meh';
                    break;
                case '0':
                    emoFileName = 'Emoji_u1f610.svg';
                    emoAlt += 'neutral';
                    break;
                case '5':
                    emoFileName = 'Emoji_u1f923.svg';
                    emoAlt += 'ecstatic';
                    break;
                case '4':
                    emoFileName = 'Emoji_u1f604.svg';
                    emoAlt += 'crazy good';
                    break;
                case '3':
                    emoFileName = 'Emoji_u1f603.svg';
                    emoAlt += 'very good';
                    break;
                case '2':
                    emoFileName = 'Emoji_u1f642.svg';
                    emoAlt += 'good';
                    break;
                case '1':
                    emoFileName = 'Emoji_u1f60f.svg';
                    emoAlt += 'ok';
                    break;
                case 'holiday':
                    emoFileName = 'Emoji_u1f60e.svg';
                    emoAlt += 'away';
                    break;
                case 'sick':
                    emoFileName = 'Emoji_u1f912.svg';
                    emoAlt += 'ill';
                    break;
                default:
                    emoFileName = 'Emoji_u1f636.svg';
                    emoAlt += 'no data';
                }

                return {
                    src: '/static/img/smileys/' + emoFileName,
                    alt: emoAlt
                };
            },
            currentSize() {
                // optional prop, 60 if undefined
                return (this.size) ? this.size : 60;
            }
        }
    };
</script>

<style scoped>
    
</style>
