export default function Warnings() {
  return (
    <div className="warningCard">
      <div className="warningHeader">
        ⚠️ Important Payment Instructions
      </div>

      <div className="warningItem">
        <span className="warningTitle">Exact Amount</span>
        <span className="warningText">
          Pay the total amount in ONE single transaction.
        </span>
      </div>

      <div className="warningItem">
        <span className="warningTitle">Two Decimals</span>
        <span className="warningText">
          Please include the two digits after the decimal point.
        </span>
      </div>

      <div className="warningItem">
        <span className="warningText">
          Don’t pay for the same link repeatedly.
        </span>
      </div>

      <div className="warningItem">
        <span className="warningText">
          Please select the payment method you need and make sure your phone
          has the corresponding wallet software installed.
        </span>
      </div>
    </div>
  );
}
