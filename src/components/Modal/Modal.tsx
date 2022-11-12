import React from 'react'

import styles from './Modal.module.scss'

interface IModalProps {
    title: string;
    description: string;
    confirm: () => void;
    cancel: () => void;
}

export const Modal = ({ title, description, confirm, cancel }: IModalProps) => {
    return (
        <div className={styles.Modal}>
            <div className={styles.Content}>
                <h2>{title}</h2>
                <p>{description}</p>
                <div>
                    <button onClick={() => cancel()}>Cancel</button>
                    <button onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
