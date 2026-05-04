import { v4 as uuidv4 } from 'uuid';

function getSessionId(req, res) {
    let sid = req.cookies?.sid;

    if (!sid) {
        sid = uuidv4();
        
        res.cookie("sid", sid, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
    }

    return sid;
}

export { getSessionId }