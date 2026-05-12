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

                                {/* ✅ Program Title */}
                                <h5 className="card-title">{program.title}</h5>

                                {/* ✅ Start Date */}
                                <p className="mb-1">
                                    <strong>Start:</strong>{" "}
                                    {new Date(program.startDate).toLocaleDateString()}
                                </p>

                                {/* ✅ End Date */}
                                <p className="mb-1">
                                    <strong>End:</strong>{" "}
                                    {new Date(program.endDate).toLocaleDateString()}
                                </p>

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