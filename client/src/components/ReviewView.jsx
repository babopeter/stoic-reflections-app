import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Circle } from 'lucide-react';

const ReviewView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => {
        setReview(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching review:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-stone-500">Loading reflection...</div>;
  if (!review) return <div className="text-center py-20 text-red-500">Reflection not found.</div>;

  const { answers } = review;

  const Section = ({ title, children }) => (
    <div className="bg-white border border-stone-200 rounded-lg p-8 mb-8 shadow-sm">
      <h3 className="text-xl font-bold mb-6 border-b border-stone-100 pb-2">{title}</h3>
      {children}
    </div>
  );

  const StatusItem = ({ label, checked }) => (
    <div className="flex items-center gap-3 mb-3">
      {checked ? <CheckCircle size={18} className="text-stone-800" /> : <Circle size={18} className="text-stone-300" />}
      <span className={checked ? "text-stone-800" : "text-stone-400 line-through"}>{label}</span>
    </div>
  );

  const DisplayText = ({ label, value }) => (
    <div className="mb-6">
      <h4 className="text-xs font-bold uppercase text-stone-400 mb-2">{label}</h4>
      <p className="text-stone-800 whitespace-pre-wrap leading-relaxed">
        {value || <span className="italic text-stone-300">No reflection recorded.</span>}
      </p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-8">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <header className="mb-12 border-b border-stone-200 pb-8">
        <div className="flex items-center gap-3 text-stone-500 mb-2">
          <Calendar size={20} />
          <span className="font-sans uppercase tracking-widest text-sm">
            {new Date(review.date).toLocaleDateString(undefined, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <h2 className="text-4xl font-serif">Weekly Reflection Review</h2>
      </header>

      {/* 1. Orientation */}
      <Section title="1. Orientation">
        <StatusItem label="Sit quietly for 3–5 breaths" checked={answers.orientation.sitQuietly} />
        <StatusItem label="Notice current mood without analysis" checked={answers.orientation.noticeMood} />
        <StatusItem label="Acknowledge: “This review is for correction, not judgment.”" checked={answers.orientation.acknowledge} />
      </Section>

      {/* 2. Attention Audit */}
      <Section title="2. Attention Audit">
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(answers.attentionAudit.categories).map(([key, val]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-sans uppercase tracking-wider ${val ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-400'}`}>
              {key}
            </span>
          ))}
        </div>
        <DisplayText label="Where was attention well spent?" value={answers.attentionAudit.reflection.wellSpent} />
        <DisplayText label="Where was it wasted?" value={answers.attentionAudit.reflection.wasted} />
        <DisplayText label="What patterns repeat?" value={answers.attentionAudit.reflection.patterns} />
      </Section>

      {/* 3. Emotional Review */}
      <Section title="3. Emotional Review">
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(answers.emotionalReview.emotions).map(([key, val]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-sans uppercase tracking-wider ${val ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-400'}`}>
              {key}
            </span>
          ))}
        </div>
        <DisplayText label="Which emotions were prolonged unnecessarily?" value={answers.emotionalReview.reflection.prolonged} />
        <DisplayText label="Where did narrative extend emotion?" value={answers.emotionalReview.reflection.narrative} />
        <DisplayText label="Did I notice emotions early?" value={answers.emotionalReview.reflection.noticeEarly} />
      </Section>

      {/* 4. Stoic Control Check */}
      <Section title="4. Stoic Control Check">
        {answers.controlCheck.situations.map((sit, idx) => (
          <div key={idx} className="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-0 border-stone-100">
            <DisplayText label="Situation" value={sit.text} />
            <div className="flex gap-8 mb-6">
              <div>
                <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Within control?</span>
                <span className={`text-sm font-bold ${sit.withinControl ? 'text-green-600' : 'text-red-600'}`}>
                  {sit.withinControl === null ? 'N/A' : (sit.withinControl ? 'YES' : 'NO')}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1">Acted as if it was?</span>
                <span className={`text-sm font-bold ${sit.actedAsIf ? 'text-stone-800' : 'text-stone-400'}`}>
                  {sit.actedAsIf === null ? 'N/A' : (sit.actedAsIf ? 'YES' : 'NO')}
                </span>
              </div>
            </div>
            <DisplayText label="What was neglected?" value={sit.neglected} />
          </div>
        ))}
      </Section>

      {/* 5. Speech & Action Review */}
      <Section title="5. Speech & Action Review">
        <div className="mb-6">
          <StatusItem label="Speak when silence was wiser?" checked={answers.speechAction.actions.speakSilence} />
          <StatusItem label="Remain silent when honesty was required?" checked={answers.speechAction.actions.silentHonesty} />
          <StatusItem label="Act from impulse rather than reason?" checked={answers.speechAction.actions.impulse} />
          <StatusItem label="Avoid necessary discomfort?" checked={answers.speechAction.actions.avoidDiscomfort} />
        </div>
        <DisplayText label="Moment" value={answers.speechAction.reflection.moment} />
        <DisplayText label="Better Response" value={answers.speechAction.reflection.betterResponse} />
        <DisplayText label="Cue to notice" value={answers.speechAction.reflection.cue} />
      </Section>

      {/* 6. Self & Ego Check */}
      <Section title="6. Self & Ego Check">
        <DisplayText label="Self-image driven behavior" value={answers.selfEgo.behavior} />
        <DisplayText label="Seeking validation" value={answers.selfEgo.validation} />
        <DisplayText label="Presence & Compassion" value={answers.selfEgo.compassion} />
        <DisplayText label="Outcome" value={answers.selfEgo.improved} />
      </Section>

      {/* 7. Gratitude & Mortality */}
      <Section title="7. Gratitude & Mortality">
        <DisplayText label="Taken for granted" value={answers.gratitudeMortality.takenForGranted} />
        <DisplayText label="Ordinary moment" value={answers.gratitudeMortality.ordinaryMoment} />
        <DisplayText label="If this were the last repeat" value={answers.gratitudeMortality.different} />
        <DisplayText label="What to stop postponing" value={answers.gratitudeMortality.stopPostponing} />
      </Section>

      {/* 8. One Correction */}
      <Section title="8. One Correction for Next Week">
        <div className="bg-stone-100 p-8 rounded-lg border-l-4 border-stone-800">
          <p className="text-2xl italic font-serif leading-relaxed text-stone-800">
            “Next week, when <span className="font-bold border-b-2 border-stone-400 px-1">{answers.correction.trigger || '...'}</span> occurs, I will <span className="font-bold border-b-2 border-stone-400 px-1">{answers.correction.action || '...'}</span>.”
          </p>
        </div>
      </Section>

      {/* 9. Closing Reset */}
      <Section title="9. Closing Reset">
        <StatusItem label="Take one breath" checked={answers.closing.breath} />
        <StatusItem label="Drop the review" checked={answers.closing.drop} />
        <StatusItem label="Began the next week cleanly" checked={answers.closing.begin} />
      </Section>
    </div>
  );
};

export default ReviewView;
