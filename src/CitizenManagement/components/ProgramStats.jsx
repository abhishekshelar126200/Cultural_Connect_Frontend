export default function ProgramStats({ programStats }) {

    return (
        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card text-center p-3 shadow">
                    <h6>Applied Programs</h6>
                    <h3>{programStats.appliedPrograms}</h3>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center p-3 shadow bg-success text-white">
                    <h6>Approved Programs</h6>
                    <h3>{programStats.approvedPrograms}</h3>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center p-3 shadow bg-danger text-white">
                    <h6>Rejected Programs</h6>
                    <h3>{programStats.rejectedPrograms}</h3>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center p-3 shadow">
                    <h6>Notifications</h6>
                    <h3>{programStats.notifications}</h3>
                </div>
            </div>

        </div>
    );
}
