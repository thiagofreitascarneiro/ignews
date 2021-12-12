import {FaGithub} from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'

export function SignInButton(){
    const isUserLoggedIn = false;


    return isUserLoggedIn ?(
        <button 
        type="button"
        className={styles.signInButton}
        >
            <FaGithub color="#04d361"/>
            Thiago Carneiro
            <FiX color='737388' className={styles.closeIcon} />
        </button>
    ): (
        <button 
        type="button"
        className={styles.signInButton}
        >
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    );
}