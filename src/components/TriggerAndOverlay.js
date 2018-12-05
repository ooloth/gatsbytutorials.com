function TriggerAndOverlay({
  formats,
  currentFormat,
  setFormat,
  topics,
  currentTopic,
  setTopic,
  authors,
  currentAuthor,
  setAuthor,
  sources,
  currentSource,
  setSource,
  className
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Bind modal to appElement (http://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement(`#___gatsby`)
  })

  function openModal() {
    setIsModalOpen(true)
    noScroll.on()
  }

  function closeModal() {
    noScroll.off()
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={openModal} aria-expanded={isModalOpen} className={className}>
        <span className="sr-only">Filters</span>

        <FiltersSVG className="icon" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={500} // match exit animation timing
        overlayClassName="fixed fill"
        className="absolute top-0 bottom-0 right-0 overflow-auto scrolling-touch bg-near-white shadow-lg"
      >
        <aside className="pa3 f6 sm:f5">
          {/* Lists of all types, topics, authors and sources */}
          <Formats
            formats={formats}
            currentFormat={currentFormat}
            setFormat={setFormat}
          />

          <Topics topics={topics} currentTopic={currentTopic} setTopic={setTopic} />

          <Authors
            authors={authors}
            currentAuthor={currentAuthor}
            setAuthor={setAuthor}
          />

          <Sources
            sources={sources}
            currentSource={currentSource}
            setSource={setSource}
          />
        </aside>
      </Modal>
    </>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import noScroll from 'no-scroll'

import Formats from './Formats'
import Topics from './Topics'
import Authors from './Authors'
import Sources from './Sources'

import { ReactComponent as FiltersSVG } from '../svg/sliders-h.svg'

export default TriggerAndOverlay
