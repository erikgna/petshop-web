import styles from './Modal.module.scss'

interface IModalProps {
    title: string;
    content: JSX.Element;
    confirm: () => void;
    cancel: () => void;
}

export const Modal = ({ title, content, confirm, cancel }: IModalProps) => {
    return (
        <div className={styles.Modal}>
            <div className={styles.Content}>
                <h2>{title}</h2>
                {content}
                <div>
                    <button onClick={() => cancel()}>Cancel</button>
                    <button onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
