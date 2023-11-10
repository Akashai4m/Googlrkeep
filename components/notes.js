import { useEffect, useState } from 'react'
import { database } from '../firebase'


const Notes = ({
	setEditId,
	setEditTitle,
	setEditText,
	setShowEditForm,

}) => {
	const [allNotes, updateAllNotes] = useState([])

	useEffect(() => {
		function getAllNotes() {
			const notesRef = database.ref('/notes')

			notesRef.on('value', snapshot => {
				let data = snapshot.val() || []
				data = Object.values(data).reverse()
				updateAllNotes(data)
			})
		}
		getAllNotes()
	}, [])


	const handleClick = (id, title, description) => {
		setEditId(id)
		setEditTitle(title)
		setEditText(description)
		setShowEditForm(true)
	}

	const [currentPage, setCurrentPage] = useState(1);
	const notesPerPage = 6;
  
	// Calculate the index of the first and last notes for the current page
	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const currentNotes = allNotes.slice(indexOfFirstNote, indexOfLastNote);

	return (
		<div>
		<div className='notes'>
		{currentNotes.map((note) => (
		  <div
			key={note.id}
			className='note'
			onClick={() => handleClick(note.id, note.title, note.description)}
		  >
			<img src='/svgs/edit-pen.svg' alt='edit-svg' className='edit-svg' />
			<h3>{note.title}</h3>
			<p>{note.description}</p>
		  </div>
		))}
  
		{/* Pagination buttons */}
	
	  </div>
	  <div className='pagination'>
		  {Array.from({ length: Math.ceil(allNotes.length / notesPerPage) }).map(
			(_, index) => (
			  <button
				key={index}
				onClick={() => setCurrentPage(index + 1)}
				className={currentPage === index + 1 ? 'active' : ''}
			  >
				{index + 1}
			  </button>
			)
		  )}
		</div>
	  </div>
	)
     


}

export default Notes
