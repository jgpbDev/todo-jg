import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#219C3D',
                secondary: '#29C24C',
                success: '#13A88A',
                info: '#25E8C1',
                error: '#8F010E'
            }
        }
    }
});