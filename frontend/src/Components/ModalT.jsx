const Modal = ({ isOpen, onClose, options, onSelect }) => {
    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h2>Select an Option</h2>
          <select onChange={(e) => onSelect(e.target.value)} className="form-select">
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={onClose} className="btn">Close</button>
        </div>
      </div>
    );
  };
  