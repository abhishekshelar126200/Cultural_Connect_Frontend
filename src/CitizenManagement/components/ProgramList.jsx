import React from 'react'

export default function ProgramList({ programs }) {

    return (
        <div className="mt-5">
            <h4 className="fw-bold mb-3">Cultural Programs</h4>

            <div className="row g-4">
                {programs.map((program) => (
                    <div className="col-md-6" key={program.programId}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{program.title}</h5>

                                <p className="card-text text-muted">
                                    {program.description}
                                </p>

                                {/* <p className="mb-1">
                                    <strong>Status:</strong>{" "}
                                    <span className="badge bg-warning text-dark">
                                        {program.status}
                                    </span>
                                </p> */}

                                {/* <small className="text-muted">
                                    Applications: {program.applicationIds.length} |{" "}
                                    Grants: {program.grantIds.length} |{" "}
                                    Events: {program.eventIds.length}
                                </small> */}
                            </div>
                        </div>
                    </div>
                ))}

                {programs.length === 0 && (
                    <div className="text-center text-muted">
                        No programs available
                    </div>
                )}
            </div>
        </div>
    )
}
