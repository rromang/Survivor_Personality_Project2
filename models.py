def create_classes(db):
    class Castaways_info(db.Model):
        __tablename__ = 'Castaways'

        id = db.Column(db.Integer, primary_key=True)
        season_name = db.Column(db.String(50))
        season = db.Column(db.Integer)
        full_name = db.Column(db.String(50))
        castaway = db.Column(db.String(20))
        age = db.Column(db.Integer)
        age_group = db.Column(db.String(6))
        city = db.Column(db.String(20))
        state = db.Column(db.String(20))
        Lat = db.Column(db.Float)
        Lon = db.Column(db.Float)
        personality_type = db.Column(db.String(6))
        personality_name = db.Column(db.String(10))
        result = db.Column(db.String(15))
        total_votes_received = db.Column(db.Integer)
        immunity_idols_won = db.Column(db.Integer)



        def __repr__(self):
            return '<Castaways %r>' % (self.name)
    return 