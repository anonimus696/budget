import { AboutWrapper } from "./styles";
import { FormattedMessage } from "react-intl";

const About = () => {

    return (
        <AboutWrapper>
            <h2><FormattedMessage id="about.page" />  </h2>
            <p><FormattedMessage id="about.p1" /></p>
            <p><FormattedMessage id="about.p2" /></p>
            <p><FormattedMessage id="about.p3" /> <a target="_blank" href="https://www.youtube.com/watch?v=CXMK23cvVGY&list=PLlYbsPJVZjBygXalKUVKkvFyHQ1NifIiW&ab_channel=MaksymRudnyi">Maksym Rudnyi</a></p>
        </AboutWrapper>

    );


}


export default About;