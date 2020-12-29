import { database } from '../firebase'


const EditNote = ({
	editId,
	editTitle,
	setEditTitle,
	editText,
	setEditText,
	setShowEditForm,
	setMessage1
}) => {
	const handleDoneButton = async () => {
		setShowEditForm(false)
		setMessage1('Loading...')

		function editNote(id, title, description) {
			const editNote = {}
			editNote['/notes/' + id] = { id, title, description }
			database.ref().update(editNote)
		}
		editNote(editId, editTitle, editText)

		setMessage1('')
	}

	const handleDeleteButton = async () => {
		setShowEditForm(false)
		setMessage1('Loading...')

		function deleteNote() {
			database.ref('notes/' + editId).remove()
		}
		deleteNote()

		setMessage1('')
	}

	return (
		<form className='edit-note'>
			<input
				className='note-title'
				type='text'
				placeholder='Title'
				value={editTitle}
				onChange={(e) => setEditTitle(e.target.value)}
			/>
			<textarea
				className='note-area'
				value={editText}
				onChange={(e) => setEditText(e.target.value)}
				placeholder='Description'
			></textarea>
			<button className='delete-btn' type='button'>
				<img
					src='/svgs/delete-icon.svg'
					alt='delete-icon'
					onClick={() => handleDeleteButton()}
				/>
			</button>
			<input
				className='done-btn'
				type='button'
				value='Done'
				onClick={() => handleDoneButton()}
			/>
		</form>
	)
}

export default EditNote
