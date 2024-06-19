import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, children, actionButton, abortButton }) {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog className="rounded-xl" ref={ref} onCancel={closeModal}>
            <div className="max-w-screen-sm p-10">
                <h1 className="text-2xl mb-4">Avsluta Konto</h1>
                {children}
                <div className="flex justify-between mt-10">
                    <button className="inline-block py-4 px-8 text-lg text-center bg-red-700 text-white cursor-pointer rounded-xl hover:bg-gray-800" onClick={actionButton}>Ja</button>
                    <button className="inline-block py-4 px-8 text-lg text-center bg-slate-500 text-white cursor-pointer rounded-xl hover:bg-gray-800" onClick={closeModal}>Avbryt</button>
                </div>
            </div>
        </dialog>
    );
}

export default Modal;