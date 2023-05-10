import React from "react";

// Importing Styles
import "./RegisterModal.scss";

const RegisterModal = ({ values, setValues, setIsModalOpen }) => {
  const {
    donatedInPastThreeMonths,
    diabetes,
    hiv,
    jaundice,
    bloodTransmission,
    recurrentInfection,
    hepatitis,
  } = values;
  return (
    <div className="RegisterModal">
      <div className="RegisterModal-container">
        <h1>Pre Medical History</h1>
        <div className="form">
          <div className="radioContainer">
            <span>Have you donated in past three months?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="donatedInPastThreeMonths"
                value="true"
                onChange={() =>
                  setValues({ ...values, donatedInPastThreeMonths: true })
                }
                checked={donatedInPastThreeMonths === false ? false : true}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="donatedInPastThreeMonths"
                onChange={() =>
                  setValues({ ...values, donatedInPastThreeMonths: false })
                }
                value="false"
                checked={donatedInPastThreeMonths === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Have you ever transmitted blood?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="bloodTransmission"
                value="true"
                checked={bloodTransmission === false ? false : true}
                onChange={() =>
                  setValues({ ...values, bloodTransmission: true })
                }
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="bloodTransmission"
                onChange={() =>
                  setValues({ ...values, bloodTransmission: false })
                }
                value="false"
                checked={bloodTransmission === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Do you continually get sick?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="recurrentInfection"
                value="true"
                checked={recurrentInfection === false ? false : true}
                onChange={() =>
                  setValues({ ...values, recurrentInfection: true })
                }
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="recurrentInfection"
                onChange={() =>
                  setValues({ ...values, recurrentInfection: false })
                }
                value="false"
                checked={recurrentInfection === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Are you having Jaundice?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="jaundice"
                value="true"
                checked={jaundice === false ? false : true}
                onChange={() => setValues({ ...values, jaundice: true })}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="jaundice"
                onChange={() => setValues({ ...values, jaundice: false })}
                value="false"
                checked={jaundice === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Are you having Hepatitis?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="hepatitis"
                checked={hepatitis === false ? false : true}
                value="true"
                onChange={() => setValues({ ...values, hepatitis: true })}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="hepatitis"
                onChange={() => setValues({ ...values, hepatitis: false })}
                value="false"
                checked={hepatitis === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Are you having HIV?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="hiv"
                value="true"
                checked={hiv === false ? false : true}
                onChange={() => setValues({ ...values, hiv: true })}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="hiv"
                onChange={() => setValues({ ...values, hiv: false })}
                value="false"
                checked={hiv === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="radioContainer">
            <span>Are you Diabetic?</span>
            <div>
              <input
                type="radio"
                id="yes"
                name="diabetes"
                value="true"
                checked={diabetes === false ? false : true}
                onChange={() => setValues({ ...values, diabetes: true })}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="diabetes"
                onChange={() => setValues({ ...values, diabetes: false })}
                value="false"
                checked={diabetes === false ? true : false}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="inputContainer">
            <button onClick={() => setIsModalOpen(false)} className="btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
