import React from "react";
import "./counter.css";

export default function Counter(props) {
  // useEffect(() => {
  // $(document).ready(function(){
  //     $('.counter-value').each(function(){
  //         $(this).prop('Counter',0).animate({
  //             Counter: $(this).text()
  //         },{
  //             duration: 3500,
  //             easing: 'swing',
  //             step: function (now){
  //                 $(this).text(Math.ceil(now));
  //             }
  //         });
  //     });
  // });
  // }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="counter">
            <div className="counter-icon">
              <i className="fa fa-globe"></i>
            </div>
            <span className="counter-value">{props.cnt}</span>
            <h3>Overall Requests</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
