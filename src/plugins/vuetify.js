import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#219C3D',
                secondary: '#29C24C',
                light_green: '#4FFF78',
                dark_green: '#166929',
                success: '#13A88A',
                info: '#25E8C1',
                error: '#8F010E',
                delete: '#e90606'
            }
        }
    }
});