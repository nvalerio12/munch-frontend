import React from 'react'

function Login() {
    return (
        <div>
            <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Login</h2>
                    <form >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
