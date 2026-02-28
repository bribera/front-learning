'use client'
import Link from 'next/link'

const OnlineTab = ({ course }) => {
    return (
        <div className="bg-[#9DCCFF]/30 rounded-2xl pt-[50px] pl-[47px] pr-[50px] pb-[53px]">
            <h3 className="text-[26px] font-semibold text-[#2F327D] mb-[20px]">
                {course?.title}
            </h3>
            <p className="text-[#696984] text-[20px] leading-[180%] mb-[40px]">
                Rejoignez le meeting en ligne pour ce cours. Assurez-vous d'avoir une bonne connexion internet.
            </p>

            {course?.zoomMeetingId ? (
                <div className="flex flex-col items-center gap-[24px]">
                    <div className="w-full bg-white rounded-[16px] p-[30px] flex flex-col gap-[16px]">
                        <div className="flex justify-between items-center border-b pb-[16px]">
                            <span className="text-[18px] font-semibold text-black">Meeting ID</span>
                            <span className="text-[18px] text-[#696984]">{course.zoomMeetingId}</span>
                        </div>
                        {course.zoomPassword && (
                            <div className="flex justify-between items-center border-b pb-[16px]">
                                <span className="text-[18px] font-semibold text-black">Password</span>
                                <span className="text-[18px] text-[#696984]">{course.zoomPassword}</span>
                            </div>
                        )}
                        {course.meetingDate && (
                            <div className="flex justify-between items-center">
                                <span className="text-[18px] font-semibold text-black">Date</span>
                                <span className="text-[18px] text-[#696984]">
                                    {new Date(course.meetingDate).toLocaleString('fr-FR')}
                                </span>
                            </div>
                        )}
                    </div>
                    <Link 
                        href={`/meeting?meetingId=${course.zoomMeetingId}&password=${course.zoomPassword || ''}&courseId=${course.id}`}
                        className="w-full"
                    >
                        <button className="w-full pt-[17px] pb-[16px] bg-[#49BBBD] text-white font-bold text-[20px] rounded-[12px] hover:bg-[#49BBBD]/90 transition-colors">
                            Rejoindre le meeting
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-[20px] py-[40px]">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#9DCCFF]/30 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#49BBBD" strokeWidth="2">
                            <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                        </svg>
                    </div>
                    <p className="text-[20px] font-semibold text-[#2F327D]">Aucun meeting programmé</p>
                    <p className="text-[#696984] text-[18px] text-center">
                        Le meeting en ligne pour ce cours n'a pas encore été planifié. Revenez bientôt !
                    </p>
                </div>
            )}
        </div>
    )
}

export default OnlineTab