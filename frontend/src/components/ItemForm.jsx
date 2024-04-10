import React from 'react'

export default function ItemForm({ title, handleChange, handleSubmit }) {
    return (
        <div className="flex justify-center mt-8">
            <div className="custom_form px-4 py-8 max-w-md w-full rounded-lg shadow-xl">
                <h1 className="text-3xl mb-4">{title}</h1>
                <form className="grid grid-cols-1 gap-6" id="item_form" method="POST">

                    <input name='name' type="text" className="input_w_full form-input" placeholder="T.ex. Hyra" onChange={handleChange} />
                    <input name='price' type="number" className="input_w_small form-input" placeholder="T.ex. 200" onChange={handleChange} />
                    <input name='description' type="textarea" rows="10" cols="30" className="textarea form-textarea" placeholder="Skriv här..." onChange={handleChange} />

                    <div className="flex gap-4">
                        <a className="button_1 bg-gray-500" href="/">
                            Avbryt
                        </a>
                        {/* <input className="button_1 flex-grow bg-blue-700" type="submit" value="Lägg till" /> */}
                        <button className="button_1 flex-grow bg-blue-700" onClick={handleSubmit}>Lägg till</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
