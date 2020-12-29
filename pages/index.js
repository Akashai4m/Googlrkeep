import Head from 'next/head'
import Header from '@c/header'
import CreateNote from '@c/create-note'
import Notes from '@c/notes'
import EditNote from '@c/edit-note'
import { useState } from 'react'

export default function Home() {
	const [showEditForm, setShowEditForm] = useState(false)
	const [editId, setEditId] = useState('')
	const [editTitle, setEditTitle] = useState('')
	const [editText, setEditText] = useState('')
	const [message1, setMessage1] = useState('')

	return (
		<>
			<Head>
				<title>Sticky Notes</title>
				<link rel='icon' href='/logos/keep-logo.png' />
				<link rel='stylesheet' href='/styles/components/header.css' />
				<link rel='stylesheet' href='/styles/components/create-note.css' />
				<link rel='stylesheet' href='/styles/components/notes.css' />
				<link rel='stylesheet' href='/styles/components/edit-note.css' />
			</Head>

			<div style={showEditForm ? {} : { display: 'none' }} className='edit'>
				<EditNote
					editId={editId}
					editTitle={editTitle}
					setEditTitle={setEditTitle}
					editText={editText}
					setEditText={setEditText}
					setShowEditForm={setShowEditForm}
					setMessage1={setMessage1}
				/>
			</div>

			<div className='container'>
				<Header />

				<main>
					<CreateNote setMessage1={setMessage1} />

					<p className='message1'>{message1}</p>

					<Notes
						setEditId={setEditId}
						setEditTitle={setEditTitle}
						setEditText={setEditText}
						setShowEditForm={setShowEditForm}
					/>
				</main>
			</div>
		</>
	)
}
